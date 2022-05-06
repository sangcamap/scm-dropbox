#!/usr/bin/env python3
"""
This script contians class and funtions used to crawl Facebook Public Posts.
"""
import json
import time
import argparse
import datetime
from requests import Session
from scrapy.selector import Selector
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry


class Fb_Crawler:
    def __init__(self):
        self.limit = 25
        retry_strategy = Retry(
            total=3,
            status_forcelist=[500, 502, 503, 504],
            backoff_factor=1
        )

        self.http = Session()
        self.http.mount("https://", HTTPAdapter(max_retries=retry_strategy))

    def get_posts(self, profile_id, cursor=None):
        """
        This function is generator function which will yeild tuples in the
        following order.
        (post_id, post_type, post_unix_time, post_time, post_text)

        The last yield will be a cursor to get the next set of posts.
        """

        # Create url.
        # Will create a url for the first call
        # Will use the cursor to create the following urls
        if not cursor:
            url = (
                "https://www.facebook.com/pages_reaction_units/more/"
                f"?page_id={profile_id}"
                """&cursor={"card_id":"videos","has_next_page":true}"""
                f"&surface=www_pages_home&unit_count={self.limit}&referrer"
                "&fb_dtsg_ag&__user=0&__a=1"
            )
        else:
            cursor = cursor.replace("unit_count=8", f"unit_count={self.limit}")
            url = (
                f"https://www.facebook.com{cursor}"
                "&referrer&fb_dtsg_ag&__user=0&__a=1"
            )
        r = self.http.get(url)
        res = json.loads(r.text[9:])
        html = res["domops"][0][3]["__html"]
        doc = Selector(text=html)
        info_list = res["jsmods"]["pre_display_requires"]
        info_dict = self.get_count(info_list)
        # Extracting the div tags which make the posts.
        # Then looping through them to get the post information.
        div_tags = doc.xpath("//div[@class='_5pcr userContentWrapper']")
        for div in div_tags:
            try:
                html = div.get()
                pinned_post = div.xpath(
                    "./descendant::*/i[@data-tooltip-content]").get()
                if pinned_post:
                    continue
                post_id = div.xpath(
                    "./descendant::*/input[@name='ft_ent_identifier']/@value"
                    ).get()
                post_unix_time = div.xpath(
                    "./descendant::*/abbr[@class='_5ptz']/@data-utime").get()
                if not post_unix_time:
                    continue
                post_type = div.xpath(
                    "./descendant::*/a[@class='_5pcq']/@href"
                    ).get().split("/")[2].title()[:5]
                post_div = div.xpath(
                    "./div/div/div[@data-testid='post_message']")
                post_text = post_div.xpath("./descendant::*/text()").getall()
                post_text = "".join(post_text)
                post_text2 = div.xpath(
                    "./descendant::*/div[@class='text_exposed_root']/p/text()"
                    ).get()
                post_text = post_text if post_text else post_text2
                post_time = datetime.datetime.utcfromtimestamp(
                    int(post_unix_time))
                # post_time = dt.strftime("%Y-%m-%d %H:%M:%S")
                info = info_dict.get(post_id, {})
                # if not info:
                #     continue
                yield (
                    post_id, post_type, post_unix_time, post_time, post_text,
                    info.get("reaction_count"), info.get("comment_count"),
                    info.get("share_count"), info.get("LIKE"),
                    info.get("LOVE"), info.get("WOW"), info.get("HAHA"),
                    info.get("SUPPORT"), info.get("SORRY"), info.get("ANGER")
                )
            except Exception:
                continue
        next_cursor = doc.xpath(
            "//div[@id='www_pages_reaction_see_more_unitwww_pages_home']" +
            "//a[@ajaxify]/@ajaxify").get()

        # Yield the cursor to get the more post for the same profile.
        if next_cursor:
            yield next_cursor,

    def get_count(self, info_list):
        """
        Given facebook json list this function will extract post information.
        Returns: Dictionary
          where key is post_id and values are reaction count, comment count etc
        {
            <post_id>: {
                "reaction_count: ,
                "share_count:,
                "comment_count:,
                "LIKE":,
                "LOVE":,
                "WOW":,
                "SORRY":,
                "SUPPORT":,
                "HAHA":,
                "ANGER":,
            },..
        }
        """
        info_dict = {}
        for info in info_list:
            if info[0] == "AsyncData":
                continue
            try:
                content = info[3][1]["__bbox"]["result"]["data"]["feedback"]
                post_id = content.get("subscription_target_id")
                reaction_count = content.get("reaction_count", {}).get("count")
                share_count = content.get("share_count", {}).get("count")
                comment_count = content.get("comment_count", {}).get(
                    "total_count")
                edges = content.get("top_reactions", {}).get("edges")
                info_dict[post_id] = {
                    "reaction_count": reaction_count,
                    "share_count": share_count,
                    "comment_count": comment_count,
                }
                for edge in edges:
                    key = edge.get("node", {}).get("reaction_type")
                    value = edge.get("reaction_count")
                    info_dict[post_id][key] = value
            except Exception:
                continue
        return info_dict

    def get_post_between_dates(self, post_id, start_dt, end_dt):
        """
        This function is a generator function that will yield all the post
        tuples between the given start time and end time.
        post tuple format:
        (post_id, post_type, post_unix_time, post_time, post_text)
        """
        # Making sure that the start_date is less that the end_date
        if end_dt < start_dt:
            temp_dt = end_dt
            end_dt = start_dt
            start_dt = temp_dt

        cursor = None
        more_post_req = True
        while more_post_req:

            for post in self.get_posts(post_id, cursor):
                if len(post) == 15:
                    post_dt = post[3]
                    if start_dt < post_dt < end_dt:
                        yield post
                    elif post_dt < start_dt:
                        more_post_req = False
                        break
                else:
                    cursor = post[0]


if __name__ == '__main__':
    PARSER = argparse.ArgumentParser(
        formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    PARSER.add_argument("--page_id_file", help="input file contining page ids",
                        type=str, required=True)
    PARSER.add_argument("--start_date", help="Start date in format ( %Y%m%d )",
                        type=str, required=True)
    PARSER.add_argument("--end_date", help="End date in format ( %Y%m%d )",
                        type=str, required=True)
    PARSER.add_argument("--output_file", help="output file name", type=str,
                        required=True)
    args = PARSER.parse_args()

    try:
        start_time = datetime_obj = datetime.datetime.strptime(
            args.start_date, "%Y-%m-%d")
        end_time = datetime_obj = datetime.datetime.strptime(
            args.end_date, "%Y-%m-%d")
    except ValueError:
        raise Exception(
            "Error: Invalid date format. Valid format: {}".format("%Y-%m-%d"))

    main_st = time.time()
    fb_crawler = Fb_Crawler()

    r_file = open(args.page_id_file, "r")
    w_file = open(args.output_file, "w", encoding="utf-8")
    tsv_file_columns = [
        "page_id", "post_id", "post_type", "post_unix_time", "post_time",
        "post_text", "total_reaction_count", "comment_count", "share_count",
        "like_count", "love_count", "wow_count", "haha_count", "support_count",
        "sorry_count", "anger_count"]
    w_file.write("\t".join(tsv_file_columns) + "\n")
    for line in r_file:
        profile_id = line.strip()
        st = time.time()
        print(f"Starting Crawl for profile: {profile_id}")
        post_generator = fb_crawler.get_post_between_dates(
            profile_id, start_time, end_time)
        for post in post_generator:
            post = list(map(str, post))
            # del post[3]
            post_row = [profile_id] + post
            post_tsv = "\t".join(post_row)
            w_file.write(post_tsv + "\n")
        tt = time.time() - st
        print(f"Completed profile crawl for {profile_id} in {tt} sec")
    r_file.close()
    w_file.close()
    tt = time.time() - main_st
    print(f"Crawiling completed in {tt} sec")
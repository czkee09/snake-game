#!/usr/bin/env python
# coding=utf-8
# snakeserver.py

from BaseHTTPServer import BaseHTTPRequestHandler
from ctypes import *
import urlparse
import json

# lib = cdll.LoadLibrary("snake.dll")


class GetHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        print self.requestline
        parsed_path = urlparse.urlparse(self.path)
        self.send_response(200)
        self.end_headers()
        print parsed_path.query
        # 获取当前实物的位置，另外一条蛇的位置目前没有处理
        foodPosMap = {}
        for item in parsed_path.query.split('&'):
            key, value = item.split('=')
            foodPosMap[key] = value
        INT_ARRAY = c_int * len(foodPosMap)
        currentFood = INT_ARRAY()
        currentFood[0] = 1
        currentFood[1] = 2
        print currentFood
        # 开始计算下一步
        result = {"nextstep": 0}
        # step = lib.nextStep(currentFood)
        step = 1
        result['nextstep'] = step

        print json.dumps(result)
        self.wfile.write(json.dumps(result))
        return


if __name__ == '__main__':
    from BaseHTTPServer import HTTPServer

    server = HTTPServer(('0.0.0.0', 8080), GetHandler)
    print 'Starting server, use <Ctrl-C> to stop'
    server.serve_forever()


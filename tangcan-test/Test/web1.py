# -*- coding: utf-8 -*-
import web
import demjson
# import re
# import os
# import json

urls = (
    '/', 'hello',
    '/Volcano', 'volcano',
    '/index', 'index',
    '/upload', 'upload',
    '/memory/(.*)', 'MemoryDB',
    '/F/(.*)', 'F',
    '/ajax', 'ajax',
    '/snake', 'snake',
    '/jquery', 'jquery'
)
app = web.application(urls, globals())
render = web.template.render('templates')
# def notfound():
#   return render.NotFound()
# def internalerror():
#   return render.NotFound()

class hello:
    def GET(self):
        name = 'World'
        return 'Hello, ' + name + '!'


class volcano:
    def GET(self):
        i = web.input(name=None)
        return render.test(i.name)


class index:
    def GET(self):
        return render.index()


class ajax:
    def GET(self):
        return render.ajax()


class snake:
    def GET(self):
        return render.snake()


class jquery:
    def GET(self):
        return render.jquery3()


class upload:
    def GET(self):
        return render.upload()

    def POST(self, file_io=open("jsontest.json", 'w')):
        '''''上传文件  
        x = web.input(myfile={}) 
        return "filename: %s\n value: \n%s" % (x['myfile'].filename, x['myfile'].value)  
        '''


        x = web.input()
        data = [{'name': x.un, 'pwd': x.pwd, 'adserver_id': x.adserver_id}]
        y = demjson.encode(x)
        fp = file_io
        fp.writelines(y)
        fp.close()
        print y
        data = u'<h1>user name:%s <br>password:%s <br>adserver_id:%s</h1>' % (x.un, x.pwd, x.adserver_id)
        return data.encode('gbk')


direction = 0


class F():
    # database={}
    def GET(self, name):
        controldata = {'direction': direction}
        return demjson.encode(controldata)

    def POST(self, name):
        data1 = web.data()
        # print "data=",data1
        data2 = demjson.decode(data1)
        # print "data2=",data2["body"][0]["y"]
        # return 200
        body = data2["body"]
        food = data2["food"]
        directionF = data2["direction"]
        head = data2["head"]
        if (head["x"] % 2 == 0 and head["y"] == 0):
            direction = 1
        elif (head["x"] % 2 == 1 and head["y"] < 29):
            direction = 2
        elif (head["x"] == 29 and head["y"] > 0):
            direction = 3
        elif (head["x"] > 0 and head["y"] == 0):
            direction = 0
        elif (head["x"] < 29 and head["y"] == 29):
            direction = 2
        elif (head["x"] % 2 == 0):
            direction = 1
        print "direction=", direction
        print "(x,y)=", head["x"], ",", head["y"]





        # def DELETE(self,name):
        #    del(self.database[key])
        # def PUT(self, name=None):
        #    key = str(uuid.uuid4())
        #    self.POST(key)
        # def get_resource(self, name):
        #    result = self.get_key(str(name))
        #    if result is not None:
        #        print result
        # def get_key(self, key):
        #    return self.database[key]


# app.notfound = notfound
# app.internalerror = internalerror

if __name__ == "__main__":
    app.run()


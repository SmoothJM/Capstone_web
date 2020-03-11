# -*- coding: utf-8 -*-
"""
Created on Sat Jan 11 11:25:51 2020

@author: Jianmu
"""

#%%
import os
import sys
dir = sys.path[0]
l = len(dir) - 12
sys.path.append(dir[0:l:])
import yolo
from PIL import Image

def object_detection(image_name):
    yolov3 = yolo.YOLO()
#    image_name = "4.jpg"
    # dir_path = "E:/keras-yolo3-master/keras-yolo3-master/final_model"
    # dir_path = "C:/Users/14534/WebstormProjects/capstone/front/src/assets/customer/tongue/"
    dir_path = "public/customer/tongue/"
    # os.chdir(dir_path)
    image_path = dir_path+image_name
    image = Image.open(image_path)
    r_image,box_count,left, top, right, bottom = yolov3.detect_image(image)
    r_image.save(dir_path+"/result_whole/"+image_name)
#    print(box_count,left, top, right, bottom)
    if box_count>0:
        image = Image.open(image_path)
        cropped = image.crop((left, top, right, bottom))
        cropped.save(dir_path + "/result_box/"+image_name)
    print(box_count)
object_detection(sys.argv[1])







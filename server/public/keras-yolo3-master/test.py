import yolo
from PIL import Image

if __name__ == '__main__':
    image_path = "./1.jpg"
    image = Image.open(image_path)
    yolo = yolo.YOLO()
    r_image = yolo.detect_image(image=image)
    r_image.show()
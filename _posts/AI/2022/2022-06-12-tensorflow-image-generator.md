---
layout: post
title: 'TensorFlow 資料讀取 ImageDataGenerator 介紹(1): flow_from_directory'
categories: 'AI'
description: 'TensorFlow ImageDataGenerator flow_from_directory'
keywords: 'TensorFlow'
---

## 影像讀取方式

## ImageDataGenerator
我們可以透過 ImageDataGenerator 對資料進行 Data Augmentation，其技巧是利用現有的資料經過旋轉、翻轉、縮放…等方式增加更多的訓練資料。詳細內容可以[參考](https://hackmd.io/@allen108108/SyCsOIkxB)。除此之外，我們在訓練模型過程中，希望可以透過驗證集評估當下訓練好壞。因此可以利用 validation_split 這個設定切割驗證集的比例，所以再放入訓練集時 ImageDataGenerator 會自動幫你切割出一份驗證集。

```py
from tensorflow.keras.preprocessing.image import ImageDataGenerator

batch_size = 32
img_size = 150

train_datagen = ImageDataGenerator( 
                                    rescale=1./255,
                                    rotation_range=10,
                                    width_shift_range=0.05,
                                    height_shift_range=0.05,
                                    horizontal_flip=True,
                                    vertical_flip=False,
                                    fill_mode='reflect', 
                                    zoom_range=0.01,
                                    validation_split=0.1
                                 )
valid_datagen = ImageDataGenerator(rescale=1./255, validation_split=0.1)
test_datagen = ImageDataGenerator(rescale=1./255)
```

### flow_from_directory
透過 ImageDataGenerator 中的 flow_from_directory，給予指定的資料夾路徑會自動將該目錄內的子資料夾目錄進行分類。若要切分訓練集與驗證集記得要給予 subset 名稱以及固定 seed。

```py
img_shape = (img_size, img_size)

# 訓練集
train_generator = train_datagen.flow_from_directory(
                                                    './datasets/dog_cat/train',
                                                    target_size=(img_size, img_size),
                                                    batch_size=batch_size,
                                                    subset="training",
                                                    seed=42,                                                
                                                    class_mode='categorical')
# 驗證集
valid_generator = train_datagen.flow_from_directory(
                                                   './datasets/dog_cat/train',
                                                   target_size=(img_size, img_size),
                                                   batch_size=batch_size,
                                                   subset="validation",
                                                   seed=42,
                                                   class_mode='categorical')
# 測試集
test_generator = test_datagen.flow_from_directory(
                                                   './datasets/dog_cat/test',
                                                   target_size=(img_size, img_size),
                                                   batch_size=1,
                                                   shuffle=False,
                                                   class_mode='categorical')
 ```


我們可以透過 `class_indices` 取得類別名稱，接著透過串列長度計算類別數量。另外可以取得標籤字典 (dictionary) 取得每個類別標籤 (key) 相對應的名稱 (value)。在這個範例當中 ImageDataGenerator 自動的將所有貓 (cat) 的資料標記成：0，狗 (dog) 的資料標記成：1。
 ```py
classes = list(train_generator.class_indices) # 類別名稱
num_classes = len(train_generator.class_indices) # 類別數量
label_dict = dict((v,k) for k,v in (train_generator.class_indices).items()) # flip k,v

print(f'類別名稱: {classes}')
print(f'類別數量: {num_classes}')
print(f'標籤字典: {label_dict}')
```

輸出結果：
```
類別名稱: ['cat', 'dog']
類別數量: 2
標籤字典: {0: 'cat', 1: 'dog'}
```

### Generator 資料讀取
剛剛我們透過 flow_from_directory 方式成功的將影像放到一個 Generator 容器中。如果想要查看裡面的每一張照片可以透過 `next()` 方式去讀取每個 batch 的內容。以下圖為例假設我的 `batch_size=4`，當我每 `next()` 一次就會批次的載入四張影像。同時我能夠將每張影像的內容(img)以及標籤(label)拿出來，這會是一個多維陣列的型態。假設我要拿該 batch 的第一張照片和標籤就是 img[0] 與 label[0]。
 
 ![](/images/posts/AI/2022/img1110612-1.png)

 ```py
img , label = train_generator.next()
label=label[0].argmax()
plt.title(f'{label} {classes[label]}')
plt.imshow(img[0])
plt.show()
```


## Reference
- [stackexchange](https://datascience.stackexchange.com/questions/32194/how-to-predict-class-label-from-class-probability-given-by-predict-generator-for)
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


 
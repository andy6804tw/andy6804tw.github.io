# One-Class Convolutional Neural Network
本論文提出一個以零為中心的高斯雜訊 (zero centered Gaussian noise) 來產生一個虛假的另一個類別在 latent space。透過交叉商計算誤差學習一條邊界來完整達到一元分類的需求。在此方法中，我們可以拿一個事先預訓練好的 CNN 模型當做基底網路。訓練一個可以分類一個種類的物件，可以應用在人臉辨識、瑕疵檢測、新奇點和離群值檢測。以新奇點偵測來說，假設我們有一堆狗的相片，我們的目標就是要讓模型辨識輸入的照片是否為狗。

- UMDAA-02 Face (user authentication)
- Abnormality1001 (abnormality detection)
- FounderType-200 (novelty detection)


## 介紹
> (a) OC-SVM, maximizing the margin of a hyperplane with respect to the origin. (b) SVDD, finding a hypersphere that encloses the given data. (c) MPM, finding a hyperplane that minimizes the misclassification probability.
多元分類需要事先將預訓練的資料進行分類的標籤，相反的一元分類是要辨識此資料是否為目標物 (positive class data or target class data)。一元分類困難的原因是我們有大量的目標種類資料，但是負類(negative class)在現實生活中太多了，只要是任何的一個非目標物都算是負類。因次模訓練的過程中僅有目標種類的資料。一元分的的方法有多種例如：OC-SVM、SVDD(Support Vector Data Description)、MPM(Minimax Probability Machines)


![](https://i.imgur.com/KXzwBYE.png)
> (a) OC-SVM, maximizing the margin of a hyperplane with respect to the origin. (b) SVDD, finding a hypersphere that encloses the given data. (c) MPM, finding a hyperplane that minimizes the misclassification probability.
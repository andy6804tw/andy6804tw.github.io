---
layout: post
title: 'c++ vector 陣列使用與讀取txt文件'
categories: 'C++'
description: 'read numbers in a text file into an array'
keywords: 
---

## 前言
Vector 是C++ 標準程式庫中的序列容器。向量會將指定類型的專案儲存線上性排列中，並允許快速隨機存取任何元素。 

## 1D vector

```c
#include <stdio.h>
#include <vector>

using namespace std;
int main() {
    vector<int> inputValues = {1,2,3,4}; 
    // Display the vector 方法一
    for (int count = 0; count < inputValues.size(); count++){
        printf("%d ", inputValues[count]);
    }
    printf("\n---------------------------------\n");
    // Display the vector 方法二
    for (int x : inputValues)
        printf("%d ", x);
    printf("\n");
}
```


輸出結果:
```
1 2 3 4
---------------------------------
1 2 3 4
```

## vector 陣列初始化
當有一個浮點陣列 `double arr[]`，建立一個浮點 vector 時可以直接初始化。

```c
#include <iostream>
#include <vector>

int main(){
    
    double arr[]={0.1, 0.2, 0.3};
    std::vector<double> values(arr, arr+3); 
    
    for(int i= 0;i<values.size();i++)
        std::cout<< values[i] <<", ";
}
```

亦或是使用 `assign()` 將指定陣列透過指標位置初始化 vector。
```c
#include <iostream>
#include <vector>

int main(){
    
    double arr[]={0.1, 0.2, 0.3};
    std::vector<double> values; 
    
    values.assign(arr, arr+3);
    for(int i= 0;i<values.size();i++)
        std::cout<< values[i] <<", ";
}
```

以上輸出結果:
```
0.1, 0.2, 0.3
```

## 2D vector
可以建立一個二維 vector 並給予初值，直接透過 `{}` 將維度內的元素進行區隔。

```c
#include <stdio.h>
#include <vector>

using namespace std;
#define HEIGHT 2
#define WIDTH 3
int main() {
  vector<vector<int>> inputValues
    {
        {1, 2, 3},
        {4, 5, 6}
    };
          
   // Display the vector 方法一
    for (int i = 0; i < HEIGHT; i++)
        for (int j = 0; j < WIDTH; j++)
            printf("%d ", inputValues[i][j]);
    printf("\n---------------------------------\n");
    // Display the vector 方法二
    for (vector<int> vect1D : inputValues)
    {
        for (int x : vect1D)
        {
            printf("%d ", x);
        }    
    }
    printf("\n");
}
```

輸出結果:
```
1 2 3 4 5 6 
---------------------------------
1 2 3 4 5 6 
```

又或者可以先手動 resize 接著逐一的透過迴圈塞入數值:
```c
#include <stdio.h>
#include <vector>

using namespace std;
#define HEIGHT 2
#define WIDTH 3
int main() {
  vector<vector<float> > array2D;

  // Set up sizes. (HEIGHT x WIDTH)
  array2D.resize(HEIGHT);
  for (int i = 0; i < HEIGHT; i++)
    array2D[i].resize(WIDTH);
  // Insert values
  int index = 0;
  vector<float> inputValues = {1,2,3,4,5,6}; 
  for (int i = 0; i < HEIGHT; i++)
      for (int j = 0; j < WIDTH; j++)
          array2D[i][j] = inputValues[index++];
          
   printf("%f\n", array2D[1][2]); // print last one

}
```

## 讀取 txt 數值並儲存陣列
首先建立一個 `data.txt` 文件，透過空白或換行區隔每個數字。

```
1 2 3 4 5 6
```

接著在 `main.cpp` 中透過 fstream 讀檔，並依序的讀取每個數值並塞入到 vector 陣列中。

```c
#include <stdio.h>
#include <vector>
#include <fstream>

using namespace std;
int main() {
    vector<float> inputValues; 
    std::ifstream file("./data.txt"); 
    while(!file.eof()) 
    {
        double i; 
        file >> i; 
        inputValues.emplace_back(i); 
    }
    // Display the numbers read
    for (int count = 0; count < inputValues.size(); count++){
        printf("%f\n", inputValues[count]);
    }
}
```

## 讀取 txt 字串並儲存陣列
首先建立一個 `vocab.txt` 文件，透過空白或換行區隔每個字串。

```
[PAD]
[UNK]
[CLS]
[SEP]
[MASK]
```

```c
#include <iostream>
#include <fstream>
#include <string>
#include <vector>

int main(){
    
    std::vector<std::string> inputValues; 
    std::ifstream file("./vocab.txt"); 
    while(!file.eof()) 
    {
        std::string i; 
        file >> i; 
        inputValues.emplace_back(i); 
    }
    std::cout<< inputValues[0] <<"\n";
}
```

### Queue 轉換成 Vector 
透過 `push_back()` 在 vector 容器尾部添加一個元素，然而在 C++ 11 中推薦使用 `emplace_back()`。兩者區別在於底層實現的機制不同。`push_back()` 向容器尾部添加元素時，首先會創建這個元素，然後再將這個元素拷貝或者移動到容器中(如果是拷貝的話，事後會自行銷毀先前創建的這個元素)；而 `emplace_back()` 在實現時，則是直接在容器尾部創建這個元素，省去了拷貝或移動元素的過程。

```c
# include<vector>
# include<queue>
# include<iostream>
using namespace std;

int main(){
    vector<int> v;
    queue<float> q;
    q.push(1);
    q.push(2);
    q.push(3);
    // convert queue to vector
    while (!q.empty())
    {
        v.emplace_back(q.front());
        q.pop();
    }
    // print vector
    for(int i=0;i<v.size();i++){
        cout<< v[i] << " ";
    }
    cout<< endl;
}
```

## Reference
- [2D Vector In C++ With User Defined Size](https://www.geeksforgeeks.org/2d-vector-in-cpp-with-user-defined-size/)
- [Multi-Dimensional Arrays](https://cplusplus.com/forum/articles/7459/)
- [How can I read numbers in a text file into an array in C++?](https://www.quora.com/How-can-I-read-numbers-in-a-text-file-into-an-array-in-C%2B%2B/answer/Vishal-Oza-4?ch=10&oid=137495368&share=6e487327&target_type=answer)
- [C++ STL vector添加元素詳解](http://c.biancheng.net/view/6826.html)
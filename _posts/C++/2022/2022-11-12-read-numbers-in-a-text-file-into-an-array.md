

# Multi-Dimensional Arrays

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

## Reference
- [2D Vector In C++ With User Defined Size](https://www.geeksforgeeks.org/2d-vector-in-cpp-with-user-defined-size/)
- [Multi-Dimensional Arrays](https://cplusplus.com/forum/articles/7459/)
- [How can I read numbers in a text file into an array in C++?](https://www.quora.com/How-can-I-read-numbers-in-a-text-file-into-an-array-in-C%2B%2B/answer/Vishal-Oza-4?ch=10&oid=137495368&share=6e487327&target_type=answer)
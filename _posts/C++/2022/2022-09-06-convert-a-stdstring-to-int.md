---
layout: post
title: 'C++ 如何將字串轉換成整數型態'
categories: 'C++'
description: 'How can I convert a std::string to int?'
keywords: 
---



### 1. std::stoi
stoi 用來轉換 string 的，作用是將字串(string)轉化為 int 型態。

```c
#include <iostream>
#include <string>

using namespace std;
int main()
{
    string str = "1010";  
    int number = std::stoi(str);
	  printf("Result: %d\n",number);
}
```

### 2. std::atoi
這是 C 語言中把字符串轉換成整型數的一個函數。atoi 轉化的是 `char[]`，因此 `c_str()` 的作用是將 `string*` 轉化為 `const char*`。

```c
#include <iostream>
#include <string>

using namespace std;
int main()
{
    std::string str = "1010";
    int number = std::atoi(str.c_str()); 
    printf("Result: %d\n",number);
}
```

### 3. string streams
此方法執行速度慢，另外要引入 `sstream` 庫。

```c
#include <iostream>
#include <string>
#include <sstream>

using namespace std;
int main()
{
    string str = "1010";  
    int number;  
    std::istringstream(str) >> number;
    printf("Result: %d\n",number);
}
```

### 4. sscanf()
透過 sscanf 讀取輸入一個字符串格式化。

```c
#include <iostream>
#include <string>

using namespace std;
int main()
{
     std::string str = "1010";
     int number;
     if (sscanf(str.c_str(), "%d", &number) == 1) 
     {
         printf("Result: %d\n",number);
     }
}
```

## 後記
在 C++ 語言中可以很方便的透過 string 建立字串。若要顯示內容在 printf 中必須要加上 `c_str()` 給予字元指標。

```
#include <iostream>
#include <string>

using namespace std;
int main()
{
     std::string str = "1010 Blog";
     printf("%s\n",str.c_str()); // 方法一
     cout << str << endl; // 方法二
}
```

## Reference
- [[stackoverflow] How can I convert a std::string to int?](https://stackoverflow.com/questions/7663709/how-can-i-convert-a-stdstring-to-int)
- [C++ tutorial](https://ithelp.ithome.com.tw/articles/10256939)
---
layout: post
title: 'C++ 函式回傳多個數值'
categories: 'C++'
description: 'Returning multiple values from a C++ function'
keywords: 
---

## 前言
在本文中將展示如何透過 C++ 的 tuple 使得函式的 return 允許有多個數值回傳到主程式中。tuple 在 c++11 中被推出，我們也可以把他當做一個通用的結構(struct)來用，在某些情況下可以取代結構使程式更簡潔。

## C++ tuple 用法
### tuple 的建立和初始化
`std::tuple` 理論上可以有無數個任意型別的成員變數，而 `std::pair` 只能是2個成員，因此在需要儲存3個及以上的資料時就需要使用 tuple。以下展示建立兩個成員的 tuple 初始化，並獲取元素的值。

- 獲取tuple物件元素的值可以通過 `get<Ith>(obj)` 方法進行獲取
  - Ith - 是想獲取的元素在tuple物件中的位置。
  - obj - 是想獲取tuple的物件


```c
#include <iostream>
#include <tuple>

int main(){
    std::tuple<std::string,int> mytuple("Andy", 27); // 建立並初始化數值
    mytuple = std::make_tuple ("Andy", 27); // 也可以事後更新內容
    std::cout << std::get<0>(mytuple) << " " << std::get<1>(mytuple) << std::endl;
}
```

輸出結果：
```
Andy 27
```

在 c++11 中也可以使用 `tie()` 來解析 tuple 內容。

```c
#include <iostream>
#include <tuple>

int main(){
    std::tuple<std::string,int> mytuple;
    mytuple = std::make_tuple("Andy", 27);
    
    std::string name;
    int age;
    std::tie(name,age) = mytuple;
    std::cout << name << " " << age << std::endl;
}
```

輸出結果：
```
Andy 27
```

c++17 中可以這樣寫(個人覺得這樣更簡潔)。

```c
#include <iostream>
#include <tuple>

int main(){
    std::tuple<std::string,int> mytuple;
    mytuple = {"Andy", 27};
    
    auto [name, age] = mytuple;
    std::cout << name << " " << age << std::endl;
}
```

輸出結果：
```
Andy 27
```

## tuple 陣列
剛剛展示了單個 tuple 的使用，我們也能將他拓展成陣列型態。

```c
#include <iostream>
#include <tuple>
#include <string>

int main(){
    std::tuple<std::string,int> my_tuple[10];
    my_tuple[0] = {"Andy", 27};
    my_tuple[1] = {"Jack", 28};
    std::cout << std::get<0>(my_tuple[0]) << " " << std::get<1>(my_tuple[0]) << std::endl;
    std::cout << std::get<0>(my_tuple[1]) << " " << std::get<1>(my_tuple[1]) << std::endl;

}
```

輸出結果：
```
Andy 27
Jack 28
```

## 函式回傳多個數值
回到正題，在本文一開始提到函式要回傳兩個以上的值可以使用 tuple 來實現。以下範例建立一個 `AddOne()` 函式允許輸入兩個數值，最後回傳這兩個數值個別加一的結果。

```c
#include <iostream>
#include <tuple>
#include <string>

std::tuple<int, int> AddOne(int a, int b) {
    a+=1;
    b+=1;
    return  {a, b};
}

int main(){
    auto [a, b] = AddOne(1, 2);
    std::cout << "a: " << a << std::endl;
    std::cout << "b: " << b << std::endl;
}
```

輸出結果：
```
a: 2
b: 3
```
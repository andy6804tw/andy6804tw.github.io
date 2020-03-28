---
layout: post
title: '[Java筆記] 詳解 Collection-List'
categories: Program
description: java 容器list介紹
keywords: java, collection, list
---

## 前言
上一篇已經先闡述Collection在Java中所扮演的角色，在這篇教學中會教各位如何使用 `java.util.List.*` 的物件，此篇來解析 java 容器中的 List。

Collection的子介面List介面可算是應用程式中最常見的。List代表的就是所謂的清單列表，依序的放入以及取出是List最大的特點，也就是有順序性。List的實作類別有ArrayList、LinkList、Vector，這裡我們就來討論前兩個。

## 方法

| 回傳值         | 方法名稱                 | 說明                  |
|---------------|------------------------|----------------------|
| `boolean`     | add(int index,E e) |將物件加入集合中指定的位置
| `boolean`     | addAll(int index,Collection<? Extends E>c) |將傳入的集合參數中的物件加入此集合中指定的位置
| `E`           | get(int index) |取得指定位置的物件
| `int`         | indexOf(Object o) |從最前面開始找出指定物件在集合中所引的位置
| `int`         | lasrIndexOf(Object o) |從最後面開始找出指定物件在集合中所引的位置
| `ListIterator<E>`| listIterator() |傳回此集合元素的ListIterator
| `E`           | remove(int index) |移除指定位置的物件入集合中指定的位置
| `E`           | remove(int index) |將物件加入集合中指定的位置
| `List<E>`     | subList(int formIndex,int toIndex) |判斷某項目是否在 List<T> 中

## ArraysList
ArrayList可以說是List最常被使用到的實作類別了，請下以下範例:
首先第一個部分是排序，是利用Collections.sort()類別方法。

```java
import java.util.*;

public class Main {

	public static void main(String[] args) {
		Scanner scn = new Scanner(System.in);
		List<Integer> list = new ArrayList<>();
		list.add(15);
		list.add(28);
		list.add(32);
		Collections.sort(list);
		for (int n : list)
			System.out.println(n);
	}

}
```
```java
import java.util.*;

public class Main {

	public static void main(String[] args) {
	  
		List<String> list = new ArrayList<>();
		list.add("This is ArrayList 1");
		list.add("This is ArrayList 2");
		list.add("This is ArrayList 3");
		// 使用 List interface 中所提供的方法列出所有元素
		for (int i = 0; i < list.size(); i++)
			System.out.println(list.get(i));

		// 使用 for each 列出所有元素
		for (String s : list)
			System.out.println(s);

		// 使用 iterator 列出所有元素
		Iterator iterator = list.iterator();
		while (iterator.hasNext())
			System.out.println(iterator.next());
	}

}
```

## LinkList
使用LinkList來新增、修改、刪除元素效率優於ArrayList許多，因此常常被拿來實作堆疊Stack以及佇列Queue

以下用範例程式碼，說明如何利用 `LinkedList 實作 Stack`：

- Stack就是堆疊像堆盤子一樣是先進後出的概念(First In Last Out)
<img src="https://3.bp.blogspot.com/-WgSuL3BY9y0/WEUUCNcXP3I/AAAAAAAAApM/lmDKgsk8Q-MQRjwBEobdssqZeb420U0wQCLcB/s1600/Lifo_stack.png">
Resource:http://www.wikiwand.com/

以下用範例程式碼，說明如何利用 LinkedList 實作 Queue：
- Queue就是佇列就等於現實生活中排隊一樣，它是先進先出的概念(First In First Out)
<img src="https://3.bp.blogspot.com/-x7L5-UA66H0/WEUXAaUs_SI/AAAAAAAAApY/6ThEKHOvo_IhNFNs8nccqfkKlnqlq8EigCLcB/s1600/7-3.ht6.gif">

```java

import java.util.*;

class MyQueue {

	private LinkedList<String> linkedList;

	public MyQueue() {
		linkedList = new LinkedList<String>();
	}

	public void put(String name) {
		linkedList.addFirst(name);
	}

	public String get() {
		return linkedList.removeLast();
	}

	public boolean isEmpty() {
		return linkedList.isEmpty();
	}
}

public class Main {

	public static void main(String[] args) {

		MyQueue list = new MyQueue();
		list.put("This is Queue1");
		list.put("This is Queue2");
		list.put("This is Queue3");
		while (!list.isEmpty())
			System.out.println(list.get());
	}

}
```

```java
import java.util.*;

public class Main {

	public static void main(String[] args) {

		Queue<String> list = new LinkedList<>(); 
		list.offer("This is Queue1"); 
		list.offer("This is Queue2"); 
        list.offer("This is Queue3"); 
        Object o; 
        while(!list.isEmpty()) { 
            System.out.println(list.poll()); 
        } 
	}

}
```

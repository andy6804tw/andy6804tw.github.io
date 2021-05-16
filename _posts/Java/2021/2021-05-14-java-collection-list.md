---
layout: post
title: '[Java筆記] Java Collection List 使用技巧'
categories: 'Java'
description:
keywords: Java Collection
---

## 前言
[上一篇](https://andy6804tw.github.io/2021/05/13/java-collection-intro/)已經先闡述 Collection 在 Java 中所扮演的角色，在這篇教學中會教各位如何使用 `java.util.List.*` 的物件。

Collection 的子介面 List 介面可算是應用程式中最常見的。List 代表的就是所謂的清單列表，依序的放入以及取出是 List 最大的特點，也就是有順序性。List 的實作類別有 ArrayList、LinkList、Vector，這裡我們就來討論前兩個。

## 方法一覽

|  回傳值 | 方法名稱  |  說明 |
|---|---|---|
| boolean  | add(int index,E e)  | 將物件加入集合中指定的位置  |
| boolean  | addAll(int index,Collection<? Extends E>c)  |  將傳入的集合參數中的物件加入此集合中指定的位置 |
| E  | get(int index)  | 取得指定位置的物件  |
| int  | indexOf(Object o)  | 從最前面開始找出指定物件在集合中所引的位置  |
| int  | lasrIndexOf(Object o)  | 	從最後面開始找出指定物件在集合中所引的位置  |
| ListIterator<E>  | listIterator()  | 傳回此集合元素的ListIterator  |
| E  | remove(int index)  | 移除指定位置的物件  |
| List<E>  | subList(int formIndex,int toIndex)  | 判斷某項目是否在 List<T> 中。  |

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

以下用範例程式碼，說明如何利用 LinkedList 實作 Stack：
> Stack就是堆疊像堆盤子一樣是先進後出的概念(First In Last Out)

![](/images/posts/Java/2021/img1100514-1.png)

以下用範例程式碼，說明如何利用 LinkedList 實作 Queue：
> Queue就是佇列就等於現實生活中排隊一樣，它是先進先出的概念(First In First Out)

![](/images/posts/Java/2021/img1100514-2.gif)

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
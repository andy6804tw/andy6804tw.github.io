---
layout: post
title: 'Bootstrap 5 快速搭建導覽列與頁尾'
categories: 'CSS'
description: 'Bootstrap 5 Navbar and Footer'
keywords: CSS
---

## 前言
Bootstrap 5 釋出也一陣子了，相信大家對於新版本非常的期待。在本文章中將點單紀錄一下網頁最常見到的導覽列與頁尾。順便從中介紹一些前端 Bootstrap 小技巧，以利我們文快速開發。

## 導覽列 (Navbar)
導覽列預設是響應式的，並且使用 spacing 及 flex 通用類別來控制物件在導覽列的間隔及對齊。詳細的文件可以[參閱](https://bootstrap5.hexschool.com/docs/5.0/components/navbar/)六角學院貼心的翻譯文件。

![](/images/posts/css/2022/img1110522-1.png)
![](/images/posts/css/2022/img1110522-2.png)

```html
<!-- Navigation -->
<section class="section-nav">
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
            <!-- Logo -->
            <div class="header-left px-5 d-flex justify-content-center">
                <div class="align-self-center d-inline mr-1">
                    <img src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" />
                </div>
                <div class="label d-inline mx-2">Bootstrap 5</div>
            </div>
            <!-- Nav Item -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">首頁</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">關於我們</a>
                    </li>
                </ul>
                <!-- Dropdown(手機版隱藏) -->
                <div class="inline-block px-5 d-none d-lg-block">
                    <div class="btn-group">
                        <a class="btn" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                            <span>
                                <i class="far fa-user"></i>
                            </span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" id="userDropdown">
                            <li>
                                <div class="dropdown-item">
                                    <span id="userName">用戶名字</span>
                                    <span class="badge rounded-pill bg-secondary" id="groupName">級別一</span>
                                </div>
                            </li>
                            <li>
                                <a class="dropdown-item" href="javascript:void(0);" onclick="logout()"> <i class="fas fa-sign-out-alt fa-fw"></i> 登出 </a>
                            </li>
                            <div class="dropdown-divider"></div>
                            <li class="px-3">
                                <i class="fas fa-code-branch"></i>
                                <span>ver 0.0.1</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Dropdown(手機版顯示)  -->
                <ul class="navbar-nav d-block d-lg-none">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">個人服務中心</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">登出</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</section>
```

![](https://i.imgur.com/M6EHetl.gif)

從中你會發現最左邊的用戶管理 icon 在大尺寸顯示，但是到指定的視窗大小將會隱藏，取而代之的是漢堡選單內的個人服務中心。Bootstrap 很方便的可以客製化適應不同尺寸的螢幕大小將顯示什麼資訊。主要的控制是來至於 `d-block` 與 `d-none` 可以依照 sm, md, lg, xl, xxl 來對畫面操控。假設我們想在 lg 以上的尺寸顯示某 `<div>` 區塊的內容，就可以做以下設定：

```html
<div class="d-none d-lg-block"></div>
```

然而當尺寸小於 lg 進入到 md 尺寸時我們想另外顯示想要的東西時：

```html
<div class="d-block d-lg-none"></div>
```

除此之外 `d-inline` 使用使用時機也非常多，當想要兩個元件並排時可以用到。更多 Display 內容可以[參考](https://bootstrap5.hexschool.com/docs/5.0/utilities/display/)

## 頁尾(Footer)
以下提供兩種方法，通常頁尾都會希望內容居中。因此第一種方法可以透過建立 flexbox 容器來設定內層的方向，使用方式很簡單就是在最外層加上 `d-flex`。接著透過 `justify-content-center` 來設定水平置中。另外可以透過 `flex-row` 來將多個元素並排顯示，以下面範例我們希望 icon 與文字同一列顯示。最後可以透過 `align-self-center` 控制元素垂直置中。


```html
<!-- Footer -->
<section class="section-footer d-flex justify-content-center">
    <div class="align-self-center d-flex flex-row">
        <div class="icon">
            <img src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" />
        </div>
        <span class="align-self-center ms-3">©2022 Bootstrap 5</span>
    </div>
</section>
```

第二種方法

```html
<section class="section-footer d-flex justify-content-center">
    <div class="align-self-center">
        <div class="icon d-inline">
            <img src="./image/logo.png" id="colabLogo" />
        </div>
        <span class="align-middle ms-3">©2022 Bootstrap 5</span>
    </div>
</section>
```
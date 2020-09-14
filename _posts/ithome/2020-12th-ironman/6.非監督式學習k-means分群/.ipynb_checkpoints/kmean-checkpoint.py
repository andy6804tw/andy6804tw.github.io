import numpy as np
import matplotlib.pyplot as plt


show_img = True
save_img = True
save_path = 'C:/Users/admin/Documents/Program/Python/K-means/'
# 群集數量(K)
K = 3
# 樣本數量(N)
N = 20
# 特徵空間_X軸(身高)
x_scale_max = 200
x_scale_min = 0
# 特徵空間_Y軸(體重)
y_scale_max = 100
y_scale_min = 0
# 隨機產生資料
x = np.random.randint(x_scale_min, x_scale_max, N)
y = np.random.randint(y_scale_min, y_scale_max, N)
# 初始群集中心
kx = np.random.randint(x_scale_min, x_scale_max, K)
ky = np.random.randint(y_scale_min, y_scale_max, K)


# 兩點之間的距離
def L2_dis(x, y, kx, ky):
    return int(((kx-x)**2 + (ky-y)**2)**0.5)

# 對每個資料點進行分群
def cluster(x, k, kx, ky):
    team = []
    for i in range(3):
        team.append([])
    mid_dis = x_scale_max * y_scale_max
    for i in range(N):
        for j in range(K):
            distant = L2_dis(x[i], y[i], kx[j], ky[j])
            if distant < mid_dis:
                mid_dis = distant
                flag = j
        team[flag].append([x[i], y[i]])
        mid_dis = x_scale_max * y_scale_max
    return team

# 在全部資料點分群完畢後 > 計算平均 > 更新群心
def re_seed(team, kx, ky):
    sumx = 0
    sumy = 0
    new_seed = []
    for index, nodes in enumerate(team):
        if nodes == []:
            new_seed.append([kx[index], ky[index]])
        for node in nodes:
            sumx += node[0]
            sumy += node[1]
        new_seed.append([int(sumx/len(nodes)), int(sumy/len(nodes))])
        sumx = 0
        sumy = 0
    nkx = []
    nky = []
    for i in new_seed:
        nkx.append(i[0])
        nky.append(i[1])
    return nkx, nky

# K-means Clustering
def kmeans(x, y, kx, ky, fig):
    team = cluster(x, y, kx, ky)
    nkx, nky = re_seed(team, kx, ky)
    
    # 繪圖
    cx = []
    cy = []
    line = plt.gca()
    for index, nodes in enumerate(team):
        for node in nodes:
            cx.append([node[0], nkx[index]])
            cy.append([node[1], nky[index]])
        for i in range(len(cx)):
            line.plot(cx[i], cy[i], color='r', alpha=0.6)
        cx = []
        cy = []

    feature = plt.scatter(x, y)
    k_feature = plt.scatter(kx, ky)
    nk_feaure = plt.scatter(np.array(nkx), np.array(nky), s=50)
    if save_img:
        plt.savefig(save_path + '%s.png' % fig)
    if show_img:
        plt.show()

    # 判斷是否收斂
    if nkx == list(kx) and nky == (ky):
        return
    else:
        fig += 1
        kmeans(x, y, nkx, nky, fig)

kmeans(x, y, kx, ky, fig=0)
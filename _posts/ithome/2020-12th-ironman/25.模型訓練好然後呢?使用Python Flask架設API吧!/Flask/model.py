import pickle
import gzip

# 載入Model
with gzip.open('./model/xgboost-iris.pgz', 'rb') as f:
    xgboostModel = pickle.load(f)

def test():
    return "This is model.py"

def predict(input):
    predicted=xgboostModel.predict(input)[0]
    print(predicted)
    return predicted
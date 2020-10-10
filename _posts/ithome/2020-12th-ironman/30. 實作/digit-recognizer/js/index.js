
async function init() {
  model = await tf.loadLayersModel('./models/model.json');
}


async function submit() {

  const selectedFile = document.getElementById('input').files[0];
  console.log(selectedFile)
  let reader = new FileReader();
  reader.onload = e => {
    // Fill the image & call predict.
    let img = document.createElement('img');
    img.src = e.target.result;
    img.width = 144;
    img.height = 144;
    img.onload = () => {
      const showImage=document.getElementById('showImage');
      showImage.innerHTML='';
      showImage.appendChild(img);
      predict(img);
    }
  };
  // Read in the image file as a data URL.
  reader.readAsDataURL(selectedFile);
}

function findMaxIndex(result){
  const arr = Array.from(result);
  let maxIndex=0;
  let maxValue=0;
  for(let i=0;i<arr.length;i++){
    if(arr[i]>maxValue){
      maxIndex=i;
      maxValue=arr[i]
    }
  }
  return maxIndex;
}

async function predict(imgElement) {
  // 將 HTML <img> 轉換成轉換為矩陣 tensor
  const tfImg = tf.browser.fromPixels(imgElement, 1);
  // 強制將圖片縮小到 28*28 像素
  const smalImg = tf.image.resizeBilinear(tfImg, [28, 28]);
  // 將 tensor 設為浮點型態，且將張量攤平至一為矩陣。此時 shape 為 [1, 784]
  const tensor = smalImg.reshape([1, -1]);
  // 預測 
  const pred = model.predict(tensor);
  const result = pred.dataSync();
  // 取得 one hot encoding 陣列中最大的索引
  console.log(findMaxIndex(result));
  document.getElementById('resultValue').innerHTML=findMaxIndex(result);
  return tfImg;
}


// async function  predict(imgElement){
//   console.log(imgElement)
//   let tfImg =  tf.browser.fromPixels(imgElement,1).toFloat();
//   let smalImg = tf.image.resizeBilinear(tfImg, [28, 28]).reshape([28*28]);
//   smalImg = tf.cast(smalImg, 'float32');
//   let tensor = smalImg.expandDims(0);

//   const pred=model.predict(tensor);
//   const predictedValues = pred.dataSync();
//   console.log(predictedValues)
//   // console.log(tensor);

//   return tfImg;
// }



// console.log(imgElement)
//     let tfImg =  tf.browser.fromPixels(imgElement).toFloat();
//     let smalImg = tf.image.resizeBilinear(tfImg, [28, 28]);
//     // smalImg = tf.cast(smalImg, 'float32');
//     // let tensor = smalImg.expandDims(0);
//     // tensor = tensor.div(tf.scalar(255));
//     // console.log(tfImg);
//     // const tfImg=tf.browser.fromPixels(imgElement)
//     // .mean(2)
//     // .toFloat();
//     // .expandDims(0)
//     // .expandDims(-1);

//     let r=tf.image.resizeBilinear(tfImg, [1,784]);
//     // r=r.mean(2)
//     // r=r.div(tf.scalar(255));
//     // const pred=model.predict(r);
//     // const predictedValues = pred.dataSync();
//     // console.log(predictedValues)
//     data = await smalImg.data()
//     console.log(data) // plain js array
//     console.log(smalImg)
//     return tfImg;
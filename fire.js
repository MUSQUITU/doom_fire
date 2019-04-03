const firePixelsArray = []
const fireWidth = 40
const fireHeight = 40
const fireColorsPalette =[{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]



function start(){
  creatFireDataStructure()
  //fonte do fogo
  creatFireSource()
  console.log(firePixelsArray)
  renderFire()

  setInterval(calculateFirePropagation, 50)
}

function creatFireDataStructure(){
    const numberOfPixels = fireWidth * fireHeight

    for (let i = 0; i < numberOfPixels; i++){
      firePixelsArray[i]=0
    }
}
function calculateFirePropagation(){
    for(let colum=0; colum < fireWidth; colum++){
      for(let row = 0; row < fireHeight;  row++){
        const pixelIndex = colum + (fireWidth * row)

        updateFireIntensityPixel(pixelIndex)

      }
    }
    renderFire()
  }
    //função de atualizar o valor do pixelIndex
     function updateFireIntensityPixel(currentPixelIndex){
       const belowPixelIndex = currentPixelIndex + fireWidth

       if(belowPixelIndex >= fireWidth * fireHeight){
         return
       }
       const decay = Math.floor(Math.random() * 3)
       const belowPixelFireIntesity = firePixelsArray[belowPixelIndex]
       const newFireIntensity = belowPixelFireIntesity - decay >= 0 ? belowPixelFireIntesity - decay : 0

       firePixelsArray[currentPixelIndex-decay] = newFireIntensity
     }


  //função de renderizar
  function renderFire(){
      const debug = false

      let html = '<table cellpadding=0 cellpadding=0>'

      for (let row=0; row < fireHeight; row++){
        html += '<tr>'

        //posição do pixel
        for(let colum = 0; colum < fireWidth; colum++){
          const pixelIndex = colum + (fireWidth * row)
          const fireIntensity = firePixelsArray[pixelIndex]

          if(debug ===true){
            html += '<td>'
            html += `<div class="pixel-index">${pixelIndex}</div>`
            html += fireIntensity
            html += '</td>'
          }else{
            const color = fireColorsPalette[fireIntensity]
            const colorString = `${color.r},${color.g},${color.b}`
            html += `<td class="pixel" style="background-color: rgb(${colorString})">`
            html += '</td>'
          }
        }

        html += '</tr>'
      }

      html += '</table>'

      document.querySelector('#fireCanvas').innerHTML = html
  }
      //função de criar o fogo
      function creatFireSource(){
        for(let colum = 0; colum<= fireWidth; colum++){
          const overflowPixelIndex = fireWidth * fireHeight
          const pixelIndex = (overflowPixelIndex - fireWidth) + colum

          firePixelsArray[pixelIndex] = 36
        }
      }

  start()

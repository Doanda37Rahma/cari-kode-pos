document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault();
});

const query = document.getElementById("query")
const output = document.getElementById("output")

const getResult = async () => {    
    const response = await fetch(
        `https://kodepos.vercel.app/search?q=${query.value}`
    )

    const data = await response.json()
    return data
}

const getMatched = (item) => {
    let res = []

    for (let name in item) {
        if (item[name].toLowerCase().includes(query.value.toLowerCase())) 
        {
            let category = {
                'province': 'Provinsi',
                'city': 'Kota',
                'subdistrict': 'Kecamatan',
                'urban': 'Kelurahan',
                'postalcode': 'Kode Pos'
            }

            res = [category[name], item[name]]
        }
    }

    return res
}

const handleCopy = (text) => {
  navigator.clipboard.writeText(text);

  alert("Kode pos " + text + " telah ter-copy");
} 

const displayResult = async () => {
    let result = await getResult()
    
    if (result.status === false) {
        output.innerHTML = "Maaf, tidak dapat ditemukan hasil pencarian"
        return
    }

    let items = result.data.map((item) => {
        let matched = getMatched(item)
        return `<div onclick="handleCopy('${item.postalcode}')" class="item">
                    <p>${matched[0]}</p>
                    <h3>${matched[1]}</h3>
                    <p>Provinsi: ${item.province}
                        <br>
                        Kota: ${item.city}
                        <br>
                        Kecamatan: ${item.subdistrict}
                        <br>
                        Kelurahan: ${item.urban}
                    </p>
                    <h3>${item.postalcode}</h3>
                </div>`
    })

    output.innerHTML = items.join('')
}

const handleSubmit = () => {
    output.innerHTML = "mohon tunggu..."
    displayResult()
}
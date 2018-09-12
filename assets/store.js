export function saveToLocal(id,key,value){
    let seller = localStorage.getItem('seller');
    if(!seller){
        seller = {}
        seller[id] = {};
        seller[id][key] = value;
    }else{
        seller = JSON.parse(seller)
        if(!seller[id]){
            seller[id] = {};
        }
        seller[id][key] = value;
    }
    localStorage.setItem('seller',JSON.stringify(seller))
}

export function loadFromLocal(id,key,def){
    let seller = localStorage.getItem('seller');
    if(!seller){
        return def;
    }
    var sellerId = JSON.parse(seller)[id];
    if(!sellerId){
        return def;
    }
    let ret = sellerId[key];
    return ret || def;
}
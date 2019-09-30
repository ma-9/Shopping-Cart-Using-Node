module.exports = function cart(oldCart){
    this.title = oldCart.title || "";
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item,id,title){
        var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = {title: title,item: item, qty: 0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice = (oldCart.totalPrice || 0) + storedItem.price;
        this.title = title;
    };

    this.generateArray = function(){
        var array = [];
        for (var id in this.items){
            array.push(this.items[id]);
        }
        return array;
    };
}
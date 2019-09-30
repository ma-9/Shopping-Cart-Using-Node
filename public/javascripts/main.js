// var DeleteAllButton = document.getElementById('deleteAllProduct').value;

function validate(){
    var result = window.confirm("Do you want delete all products");
    if(result == true){
        return true;
    }else{
        return false;
    }
}
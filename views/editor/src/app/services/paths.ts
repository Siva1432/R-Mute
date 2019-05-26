export class Paths{
 origin:string='http://localhost:4500/'
 endPoints:{}={
        isValid:this.origin+'authorize/isvalid',
        getRole:this.origin+'authorize/role',
        getUser:this.origin+'authorize/getuser',
        logOut:this.origin+'authenticate/logout'
    }

}
const _object = {
    from : "0x123",
    to : "0x123",
    value : "0x123",
    gas : "0x123",
}
const _objects = [{
    from : "0x123",
    to : "0x123",
    value : "0x123",
    gas : "0x123",
},{
    from : "0x123",
    to : "0x123",
    value : "0x123",
    gas : "0x123",
},{
    from : "0x123",
    to : "0x123",
    value : "0x123",
    gas : "0x123",
}]
console.log(Object.values(_objects).map((data) => Object.values(data)));
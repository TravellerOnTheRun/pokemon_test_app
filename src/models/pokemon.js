export default class Pokemon {
    constructor(_id, name, types, imageUrl, abilities, stats) {
        this._id = _id;
        this.name = name;
        this.types = types;
        this.imageUrl = imageUrl;
        this.abilities = abilities;
        this.stats = stats;
    };
};
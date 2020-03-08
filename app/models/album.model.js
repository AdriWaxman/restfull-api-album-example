module.exports = mongoose => {
    const Album = mongoose.model(
      "album",
      mongoose.Schema(
        {
          title: String,
          artist: String,
          description: String,
          publishedDdate: Number,
          published: Boolean
        },
        { timestamps: true }
      )
    );

    //Si necesitas el id en vez de _id
   /* schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const Tutorial = mongoose.model("tutorial", schema);*/
  
    return Album;
  };
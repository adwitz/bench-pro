var benchData = {
  getRegimen(weight){
    weight = weight.trim();
    var url = `http://localhost:3000/workouts/${weight}`;
    return fetch(url).then((res) => res.json());
  }
};

module.exports = benchData;
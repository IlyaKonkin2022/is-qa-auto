require("../../spec/common")

class MainHelper {

  contains(where, what) {
    for ( let i=0; i < where.length; i++ ) {
      for ( let j=0; j < what.length; j++ ) {
        if ( where.indexOf(what[j]) !== -1 ) return true;
      }
    }
    return false;
  }

  containsAll (where, what) {
    for ( let i=0; i < what.length; i++ ) {
      if ( where.indexOf(what[i]) === -1) return false;
    }
    return true;
  }

}

module.exports = MainHelper;
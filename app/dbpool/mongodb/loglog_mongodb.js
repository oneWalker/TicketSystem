var MongoClient = require('mongodb').MongoClient;

module.exports=function(opts){
    if ( typeof opts.connection !== 'string' ){
        throw new Error('Invalid option `connection` connection string');
    }

    var defaults = {
        collection: 'logs'
        , collectionOptions: {
            capped: true
            , size: 1000 * 1000 * 1000 * 4
        }
    };

    for ( var key in defaults ){
        if ( !( key in opts ) ){
            opts[ key ] = defaults[ key ];
        }
    }

    var _db;
    var getDb = function( callback ){
        if ( _db ) return callback( null, _db );

        MongoClient.connect( opts.connection, function( error, db ){
            if ( error ) return callback( error );

            _db = db;

            db.createCollection( opts.collection, opts.collectionOptions, function( error, collection ){
                if ( error ) return callback( error );

                return callback( null, db );
            });
        });
    };

    return function( entry ){
        getDb( function( error, db ){
            if ( error ) throw error;

            db.collection( opts.collection ).insert( entry, { safe: false } );
        });
    };
};
const path = require('path'); 

module.exports = [ { 

    entry: path.join(__dirname,'./src/index.js'), 

    output:{ 

        path: path.join(__dirname, '/static/bundle'), 

        filename: 'bundle.js' 

    }, 

    mode: "development", 

    externals: "ws",

    resolve: {
        alias: {
            'socket.io-client': path.join( __dirname, 'node_modules', 'socket.io-client', 'socket.io.js' )
        }
    },

    devServer: { historyApiFallback: true },


    module: { 
        rules: [ 

            { 

                test: /\.(js|jsx)$/, 

                use: [ 

                    { 

                        loader: 'babel-loader', 

                        options: { 

                            presets: ['env', 'react'] 

                        } 

                    } 

                ] 

            } 

        ],
        noParse: [ /socket.io-client/ ]

    }, 

    watch: true, 

    watchOptions: { 

        aggregateTimeout: 200 

    }, 

    target: 'node' 

}, 
]; 
module.exports = function(grunt) {

    var plugins = [
        'grunt-contrib-watch',
        'grunt-contrib-uglify'
    ];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            site: {
                files: {
                    'dist/Game.min.js': [
                        'lib/underscore-min.js',
                        'lib/phaser.min.js',
                        'lib/jquery-2.1.3.js',
                        'lib/jquery.pubsub.js',
                        'lib/jquery.simplemodal.1.4.4.min.js',
                        'lib/jquery-serializeForm.min.js',
                        'src/modules/Config/Config.General.js',
                        'src/modules/Config/Config.Text.js',
                        'src/modules/Config/Config.Map.js',
                        'src/modules/Config/Config.Player.js',
                        'src/modules/Config/Config.Boat.js',
                        'src/modules/Util/Util.js',
                        'src/modules/Util/SocketManager.Methods.js',
                        'src/modules/Util/SocketManager.js',
                        'src/modules/Util/Gateway.Methods.js',
                        'src/modules/Util/Gateway.js',
                        'src/modules/Menu/Templates.js',
                        'src/modules/Game/Matches.js',
                        'src/modules/Game/Assets.js',
                        'src/modules/Game/Boat.js',
                        'src/modules/Game/Player.js',
                        'src/modules/Game/Engine.Events.js',
                        'src/modules/Game/Engine.js',
                        'src/modules/Game/Game.Map.js',
                        'src/modules/Game/Game.Collisions.js',
                        'src/modules/Game/Game.js',
                        'src/modules/Menu/Menu.Actions.js',
                        'src/modules/Menu/Menu.Validation.js',
                        'src/modules/Menu/Menu.View.js',
                        'src/modules/Menu/Menu.js'
                    ]
                }
            }
        },
        watch: {
            alljs: {
                files: [
                    'src/*.js',
                    'lib/*.js',
                    'src/modules/*/*.js'
                ],
                tasks: ['uglify']
            }
        }
    });

    // loading the plugins
    plugins.forEach(function (element, index) {
        grunt.loadNpmTasks(element);
    });

    grunt.registerTask('default', ['uglify']);
};

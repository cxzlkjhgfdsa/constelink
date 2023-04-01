pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    stages {
        stage('Project Build') {
            steps {
                script {
                    if(env.BRANCH_NAME == 'dev-front') {
                        echo "Front Project Build Step"
                        dir('Frontend') {
                            sh 'npm install'
                            sh 'npm run build'
                        }
                    }
                }
            }
        }
        stage('Image Build') {
            steps {
                script {
                    def gitCommitHash = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()

                    if(env.BRANCH_NAME == 'dev-front') {
                        echo "Front Image Build Step"
                        podTemplate(containers: [
                            containerTemplate(
                                name: 'kaniko',
                                image: 'gcr.io/kaniko-project/executor:latest',
                                ttyEnabled: true,
                                command: 'cat',
                                volumeMounts: [
                                    volumeMount(name: 'regcred-volume', mountPath: '/kaniko/.docker')
                                ]
                            )
                        ],
                        volumes: [
                            secretVolume(secretName: 'regcred', mountPath: '/kaniko/.docker', readOnly: true, name: 'regcred-volume')
                        ]) {
                            node(POD_LABEL) {
                                container('kaniko') {
                                    sh '''#!/bin/sh
                                    /kaniko/executor --context=$(pwd)/Frontend --dockerfile=$(pwd)/Frontend/Dockerfile --destination=sadoruin/constelink-front:${gitCommitHash}
                                    '''
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

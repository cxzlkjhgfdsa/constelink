pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    stages {
        stage('Front Project Build') {
            when {
                branch 'dev-front'
            }
            steps {
                echo "Front Project Build Step"
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Front Image Build') {
            when {
                branch 'dev-front'
            }
            steps {
                echo "Front Image Build Step"
                script {
                    def gitCommitHash = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
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

        stage('Auth-Server Project Build') {
            when {
                branch 'feature-back/auth-server'
            }
            steps {
                echo "Auth-Server Step"
            }
        }
        stage('Auth-Server Image Build') {
            when {
                branch 'feature-back/auth-server'
            }
            steps {
                echo "Auth-Server Step"
            }
        }

        stage('Fundraising Project Build') {
            when {
                branch 'feature-back/fundraising'
            }
            steps {
                echo "Fundraising Step"
            }
        }
        stage('Fundraising Image Build') {
            when {
                branch 'feature-back/fundraising'
            }
            steps {
                echo "Fundraising Step"
            }
        }

        stage('Beneficiary Project Build') {
            when {
                branch 'feature-back/beneficiary'
            }
            steps {
                echo "Beneficiary Step"
            }
        }
        stage('Beneficiary Image Build') {
            when {
                branch 'feature-back/beneficiary'
            }
            steps {
                echo "Beneficiary Step"
            }
        }

        stage('Member Project Build') {
            when {
                branch 'feature-back/member'
            }
            steps {
                echo "Member Step"
            }
        }
        stage('Member Image Build') {
            when {
                branch 'feature-back/member'
            }
            steps {
                echo "Member Step"
            }
        }

        stage('Notice Project Build') {
            when {
                branch 'feature-back/notice'
            }
            steps {
                echo "Notice Step"
            }
        }
        stage('Notice Image Build') {
            when {
                branch 'feature-back/notice'
            }
            steps {
                echo "Notice Step"
            }
        }

        stage('File Project Build') {
            when {
                branch 'feature-back/file'
            }
            steps {
                echo "File Step"
            }
        }
        stage('File Image Build') {
            when {
                branch 'feature-back/file'
            }
            steps {
                echo "File Step"
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploy Step"
            }
        }
    }
}

pipeline {
    agent {
            kubernetes {
                label 'kaniko'
                yaml '''
    apiVersion: v1
    kind: Pod
    metadata:
      labels:
        some-label: some-label-value
    spec:
      containers:
      - name: kaniko
        image: gcr.io/kaniko-project/executor:latest
        imagePullPolicy: Always
        command:
        - /bin/cat
        tty: true
        volumeMounts:
          - name: docker-config
            mountPath: /kaniko/.docker
      volumes:
      - name: docker-config
        secret:
          secretName: docker-hub
    '''
            }
        }

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
                dir('Frontend') {
                    def gitCommitHash = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                    container('kaniko') {
                        sh '''#!/busybox/sh
                        /kaniko/executor --context=${WORKSPACE} --dockerfile=${WORKSPACE}/Dockerfile --destination=sadoruin/constelink-front:${gitCommitHash}
                        '''
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

        }
    }
}

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
        stage('Project Build') {
            steps {
                echo "Build front-end and APIs"
            }
            when {
                branch 'dev-front'
            }
            steps {
                echo "Front Step"
                sh 'npm install'
                sh 'npm run build'
            }
            when {
                branch 'feature-back/auth-server'
            }
            steps {
                echo "Auth-Server Step"
            }
            when {
                branch 'feature-back/fundraising'
            }
            steps {
                echo "Fundraising Step"
            }
            when {
                branch 'feature-back/beneficiary'
            }
            steps {
                echo "Beneficiary Step"
            }
            when {
                branch 'feature-back/member'
            }
            steps {
                echo "Member Step"
            }
            when {
                branch 'feature-back/notice'
            }
            steps {
                echo "Notice Step"
            }
            when {
                branch 'feature-back/file'
            }
            steps {
                echo "File Step"
            }
        }

        stage('Image Build') {
            steps {
                echo "Build front-end and APIs"
            }
            when {
                branch 'dev-front'
            }
            steps {
                echo "Front Step"
                dir('Frontend') {
                    def gitCommitHash = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                    container('kaniko') {
                        sh '''#!/busybox/sh
                        /kaniko/executor --context=${WORKSPACE} --dockerfile=${WORKSPACE}/Dockerfile --destination=sadoruin/constelink-front:${gitCommitHash}
                        '''
                    }
                }
            }
            when {
                branch 'feature-back/auth-server'
            }
            steps {
                echo "Auth-Server Step"
            }
            when {
                branch 'feature-back/fundraising'
            }
            steps {
                echo "Fundraising Step"
            }
            when {
                branch 'feature-back/beneficiary'
            }
            steps {
                echo "Beneficiary Step"
            }
            when {
                branch 'feature-back/member'
            }
            steps {
                echo "Member Step"
            }
            when {
                branch 'feature-back/notice'
            }
            steps {
                echo "Notice Step"
            }
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

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
                    } else if(env.BRANCH_NAME == 'feature-back/auth-server') {
                        echo "Auth Server Project Build Step"
                        dir('Backend/AuthServer') {
                            sh 'chmod +x gradlew'
                            sh './gradlew clean build -x test'
                        }
                    }
                }
            }
        }
        stage('Image Build') {
            environment {
                PATH = "/busybox:/kaniko:$PATH"
            }
            steps {
                script {
                    podTemplate(yaml: """
                      kind: Pod
                      metadata:
                        name: kaniko
                      spec:
                        containers:
                        - name: kaniko
                          image: gcr.io/kaniko-project/executor:debug
                          imagePullPolicy: Always
                          command:
                          - sleep
                          args:
                          - 99d
                          volumeMounts:
                          - name: shared-workspace
                            mountPath: /workspace
                          - name: docker-config
                            mountPath: /kaniko/.docker
                          tty: true
                        nodeSelector:
                          node-role.kubernetes.io/control-plane: ""
                        volumes:
                        - name: shared-workspace
                          hostPath:
                            path: ${WORKSPACE}
                            type: Directory
                        - name: docker-config
                          secret:
                            secretName: regcred
                            items:
                            - key: .dockerconfigjson
                              path: config.json
                        """) {
                        node(POD_LABEL) {
                            container(name: 'kaniko', shell: '/busybox/sh') {
                                if(env.BRANCH_NAME == 'dev-front') {
                                    echo "Front Image Build Step"
                                    sh '''#!/busybox/sh
                                    /kaniko/executor --context=/workspace/Frontend --dockerfile=/workspace/Frontend/Dockerfile --destination=sadoruin/constelink-front:latest
                                    '''
                                } else if(env.BRANCH_NAME == 'feature-back/auth-server') {
                                    echo "Auth Server Image Build Step"
                                    sh '''#!/busybox/sh
                                    /kaniko/executor --context=/workspace/Backend/AuthServer --dockerfile=/workspace/Backend/AuthServer/Dockerfile --destination=sadoruin/constelink-authserver:latest
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

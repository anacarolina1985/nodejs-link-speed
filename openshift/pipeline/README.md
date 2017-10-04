This directory contains a Jenkinsfile which can be used to build
speedlink using an OpenShift build pipeline.

To do this, run:

```bash
# create the nodejs example as usual
oc new-app https://github.com/anacarolina1985/nodejs-link-speed

# now create the pipeline build controller from the openshift/pipeline
# subdirectory
oc new-app https://github.com/anacarolina1985/nodejs-link-speed \
  --context-dir=openshift/pipeline --name speedlink-pipeline
```

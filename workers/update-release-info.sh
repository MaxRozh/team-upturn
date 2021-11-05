#!/bin/bash -x

node workers/build-for-release-info/buildForReleaseInfo.js && bash workers/analyze-bundles.sh && bash workers/update-release-tag.sh

#!/bin/sh
python -m SimpleHTTPServer & 
socat OPENSSL-LISTEN:4443,reuseaddr,pf=ip4,fork,cert=test-cert.crt,key=test-cert.key,verify=0 TCP-CONNECT:localhost:8000

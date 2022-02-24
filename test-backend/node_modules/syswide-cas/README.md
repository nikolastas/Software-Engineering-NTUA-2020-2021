<div align="center"><img src="https://capriza.github.io/images/logos/logos-cert.svg" height="128" /></div>

syswide-cas
===

Enable node to use custom certificate authorities _in conjunction_ with the bundled root CAs.

Up until version 7, node did not support system-wide installed trusted certificate authorities. It was only possible to specify a custom 
CA via the `ca` option in the `tls` and `https` modules, or fallback to using the bundled list of root CAs that 
node is compiled with. 

Starting with node 7, it's possible to set the `NODE_EXTRA_CA_CERTS` environment variable to a single file containing additional root CA
to trust, however it still does not allow programatic addition of several directories and files containing root CAs.

This module enables loading custom CAs to be used _in conjunction_ with the node bundled root CAs.
syswide-cas will auto load root CAs from the file `/etc/ssl/ca-node.pem` if it exists.


## Installation

```
npm install --save syswide-cas
```

## Usage

Add `require('syswide-cas')` as soon as possible as it affects all later TLS calls. 

```javascript
// "require('syswide-cas')" immediatley loads CAs from the file /etc/ssl/ca-node.pem if it exists
const syswidecas = require('syswide-cas');

// optionally load all files from a custom directory
syswidecas.addCAs('/my/custom/path/to/certs/dir');

// or multiple directories
syswidecas.addCAs(['/my/custom/path/to/certs/dir1', '/my/other/path/to/certs/dir2']);

// optionally load a file directly
syswidecas.addCAs('/my/custom/path/to/cert.pem');

// or multiple files
syswidecas.addCAs(['/my/custom/path/to/cert1.pem', '/my/other/path/to/cert2.pem']);


const https = require('https');
https.get('https://my.custom.domain.com/with/self/signed/cert');

```

## License

Copyright 2016 Capriza. Code released under the [MIT license](LICENSE.md)


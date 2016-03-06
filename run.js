/* BLE device lookupper
 * $ npm install noble colors
 * $ node run.js
 * localname	address	is_target
 * AnyName	f5:15:02:39:d3:3a	0
 * FWM8BLZ02	e7:3a:40:83:9d:8a	1
 * undefined	04:69:f8:ac:3c:8f	0
 */

var noble = require('noble');
var _ = require('colors');

var SEPT = "\t";
var LOOKUP_LOCALNAME = "FWM8BLZ02";

console.log("localname" + SEPT + "address" + SEPT + "is_target");

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
	if (peripheral.advertisement.localName == LOOKUP_LOCALNAME) {
		var localname = peripheral.advertisement.localName.red;
		var is_target = 1;
	} else {
		var localname = peripheral.advertisement.localName;
		var is_target = 0;
	}
	console.log(localname + SEPT + peripheral.address + SEPT + is_target);
});

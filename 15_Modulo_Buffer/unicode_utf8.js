const buf3 = Buffer.alloc(3);
const buf2 = Buffer.alloc(2);
const buf = Buffer.alloc(1);
console.log("\nUTF8 (3 bytes) dese 0000 'Basic Latin' .... FFFF 'Specials'\n");
for (let a = 32; a <= 65535; a++) {
  let utf8;
  let hex;
  let decimal;
  if (a <= 127) {
    //solo empleamos un byte buf
    buf[0] = a; //ascii 7 bits (1 byte)
    hex = buf.toString("hex");
    cpUnicode = "U00" + a.toString(16).toUpperCase();
    utf8 = buf.toString();
    decimal = buf.readUInt8();
  }

  if (a >= 128 && a <= 2047) {
    //(7FF hex) then UTF-8 es 2 bytes.
    buf2[0] = 192 + a / 64;
    buf2[1] = 128 + a % 64;
    hex = buf2.toString("hex");
    cpUnicode = "U00" + a.toString(16).toUpperCase();
    utf8 = buf2.toString();
    decimal = `[${buf2.readUInt8(0)} ${buf2.readUInt8(1)}]`;
  }

  if (a >= 2048 && a <= 65535) {
    // (FFFF hex) then UTF-8 is 3 bytes long.
    buf3[0] = 224 + a / 4096;
    buf3[1] = 128 + (a / 64) % 64;
    buf3[2] = 128 + a % 64;
    hex = buf3.toString("hex");
    cpUnicode = "U" + a.toString(16).toUpperCase();
    utf8 = buf3.toString();
    decimal = `[${buf3.readUInt8(0)} ${buf3.readUInt8(1)} ${buf3.readUInt8(2)}]`;
  }
  let print = `Unicode: ${cpUnicode}; bytes UTF8(hex ${hex}, dec ${decimal}); char:${utf8}`;
  let control = `Unicode: ${cpUnicode}; bytes UTF8(hex ${hex}, dec ${decimal}); <ctrl>`;
  console.log(a < 127 || a > 159 ? print : control);
}

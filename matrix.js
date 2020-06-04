function Mat4(initial) {
  const IDENTITY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  let sp = 0;
  let data = [initial === undefined ? IDENTITY: initial];

  this.save = () => {
    let src = data[sp], // CURRENT TOP OF STACK
      dst = data[++sp]; // NEXT TOP OF STACK
    if (!dst)
      dst = data[sp] = []; // FIRST TIME? CREATE VALUES ARRAY
    for (let n = 0; n < 16; n++)
      dst[n] = src[n]; // COPY ALL 16 VALUES
  }

  this.value = () => data[sp];

  this.restore = () => --sp;

  this.rightMultiply = (matrix) => {
    let l = data[sp];
    let r = matrix.value();
    data[sp] = Mat4.multiply(l, r);
  }

  this.applyTransformation = (transformation) => {
    let l = data[sp];
    let r = transformation;
    data[sp] = Mat4.multiply(l, r);
  }

  this.identity = () => data[sp] = IDENTITY;

  this.translate = (x, y, z) => {
    let a = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
    this.applyTransformation(a);
  }

  this.scale = (x, y, z) => {
    if (!y) {
      y = x;
      z = x;
    }
    let a = [x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1];
    this.applyTransformation(a);
  }

  this.rotateX = (theta) => {
    let s = Math.sin(theta);
    let c = Math.cos(theta);
    let a = [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
    this.applyTransformation(a);
  }

  this.rotateY = (theta) => {
    let s = Math.sin(theta);
    let c = Math.cos(theta);
    let a = [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
    this.applyTransformation(a);
  }

  this.rotateZ = (theta) => {
    let s = Math.sin(theta);
    let c = Math.cos(theta);
    let a = [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    this.applyTransformation(a);
  }

  this.transform = (v) => {
    return Mat4.multVector(data[sp], v);
  }

  Mat4.multVector = (m, v) => {
    let r = [];
    r[0] = m[0] * v[0] + m[4] * v[1] + m[8] * v[2] + m[12] * v[3];
    r[1] = m[1] * v[0] + m[5] * v[1] + m[9] * v[2] + m[13] * v[3];
    r[2] = m[2] * v[0] + m[6] * v[1] + m[10] * v[2] + m[14] * v[3];
    r[3] = m[3] * v[0] + m[7] * v[1] + m[11] * v[2] + m[15] * v[3];
    return r;
  }

  Mat4.multiply = (a, b) => {
    let r = [];
    r[0] = a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3];
    r[1] = a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3];
    r[2] = a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3];
    r[3] = a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3];

    r[4] = a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7];
    r[5] = a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7];
    r[6] = a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7];
    r[7] = a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7];

    r[8] = a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11];
    r[9] = a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11];
    r[10] = a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11];
    r[11] = a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11];

    r[12] = a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15];
    r[13] = a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15];
    r[14] = a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15];
    r[15] = a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15];

    return r;
  }

}

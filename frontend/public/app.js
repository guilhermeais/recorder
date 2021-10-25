let bytesAmount = 0;

const formatBytes = (bytes, decimals = 2) =>{
    if(bytes === 0)return '0 Bytes';

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return (
        parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    )
}

const updateStatus = (size) => {
  const text = `Peding Bytes to Upload: <strong>${formatBytes(size)}</strong>`;
  document.getElementById("size").innerHTML = text;
};

const showSize = () => {
  const { files: fileElement } = document.getElementById("file");
  if (!fileElement.length) return;

  const files = Array.from(fileElement);
  const {size} = files.reduce((prev, next) => ({ size: prev.size + next.size }), {
    size: 0,
  });

  bytesAmount = size;
  updateStatus(size)

  const interval = setInterval(() => {
      console.count()
      const result = bytesAmount - 5e6
      bytesAmount = result < 0 ? 0 : result
      updateStatus(bytesAmount)
      if (bytesAmount === 0) {
          clearTimeout(interval)
      }
  }, 50);
 
};

const onload = () => {
  console.log("loaded");
};

window.onload = onload;
window.showSize = showSize;

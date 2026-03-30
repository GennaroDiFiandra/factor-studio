// export function initAnimations(): void {
//   const icons = document.querySelectorAll('.background__bio__line__icon *');

//   if (!icons.length) return;

//   icons.forEach((el) => {
//     if (typeof (el as SVGGeometryElement).getTotalLength !== 'function') return;

//     const length = Math.ceil((el as SVGGeometryElement).getTotalLength());
//     (el as SVGElement).style.strokeDasharray = `${length}`;
//     (el as SVGElement).style.strokeDashoffset = `${length}`;
//   });
// }

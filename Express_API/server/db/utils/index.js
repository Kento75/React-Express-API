
// 検索文字列を前方から一致するかチェック
export function getForwardMatchString( target ){
  if( typeof target === "string" ){
    return new RegExp( "^"+target, "i" );
  }
  else {
    return target;
  }
}
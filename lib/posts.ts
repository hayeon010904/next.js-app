import fs from "fs";
import path from "path";
import matter from "gray-matter";
//posts폴더의 경로 잡아줌
const postDirectory = path.join(process.cwd(), "posts");
console.log("process.cwd()", process.cwd());
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postDirectory);
  // pre-rendering.md랑 ssg.ssr.md두개가 배열로 들어있음.
  console.log("fileNames", "fileNames");
  //하나씩 맵으로 돌려줘. md삭제하고 앞부분만 아아디가 되도록.
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postDirectory, fileName);
    //utf인코딩으로 파일 읽기
    const fileContents = fs.readFileSync(fullPath, "utf8");
    //matter=> md 파일을 객체로 변환해줌.
    const matterResult = matter(fileContents);
    return {
      id,
      ...(matterResult.data as { data: string; title: string }),
    };
  });
  //객체를 날짜로 정렬
  return allPostsData.sort((a, b) => {
    if (a.data < b.data) {
      return 1;
    } else {
      return -1;
    }
  });
}

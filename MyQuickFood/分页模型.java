
//mvc请求后台，分页控制类
@Controller
@RequestMapping("/baseJsp")
public class PostPagingController {
	
	@Autowired
	private PostPagingService pps;
	@Autowired
	private FocusCollectService fcs;
//对于index主页的“我的关注”--点击查看后得到“我的关注的该人的帖子列表”，进行分页，
			@RequestMapping("pagingTheUserPost")
			public void pagingTheUserPost(@Param("nowPage") int nowPage , @Param("inp")int inp,@Param("userId")int userId,Model model,HttpServletResponse response,HttpServletRequest request) throws IOException {
				PrintWriter pw=response.getWriter();
				JSONObject jons=new JSONObject();
				User user=null;
				if(request.getSession().getAttribute("user")!=null) {
					user=(User) request.getSession().getAttribute("user");
				}
				PageBean<Post> pag=pps.findMyPostResultsByPageBean(nowPage,userId);//获取分页得数据
				if(inp==0) {
					inp=1;
				}else if(inp>pag.getPageCount()){
					inp=pag.getPageCount();
							
				}else {
					
				}
				
				jons.put("nowPage", pag.getNowPage());//当前页
				jons.put("allCount", pag.getPageCount());//总的页数
				jons.put("inp", inp);//文本框的跳转值
				jons.put("posts", pag.getPageLists());//数据集
				pw.print(jons.toJSONString());
			}
	}
	
	
//分页服务类
//获取满足“我的帖子”的帖子集合
		public PageBean<Post> findMyPostResultsByPageBean( int nowPage,int userId) {//即通过当前页码从而获取到对应的输出的集合
			List<Post> pageLists=new ArrayList<>();
			PageBean<Post> pag=new PageBean<>();
			
			
			//封装总记录数，通过总的查询语句
			pag.setAllCount(pm.getMyPostByIdCount(userId));
			//封装一页显示多少条，配置写在了properties文件中的postPagingTrs\
			//int perCoun=bp.getPropertiesValue("$")
			pag.setPerPageCount(Integer.parseInt(bp.getPropertiesValue("10")));
			//封装总页数,向上取整数
			int allPage=(pag.getAllCount()+pag.getPerPageCount()-1)/pag.getPerPageCount();
			//封装当前页码
			if(nowPage<1) {nowPage=1;}
			if(nowPage>allPage) {nowPage=allPage;}
			pag.setNowPage(nowPage);System.out.println("页："+allPage);
			pag.setPageCount(allPage);//不理解参照工具类datatypetool的数学证明；
			//获取开始行数
			int start=(nowPage-1)*pag.getPerPageCount();
			pageLists=pm.getMyPostByIdLimit(start,pag.getPerPageCount(),userId);
			pag.setPageLists(pageLists);
			return pag;
		}
		
	
			
//分页实体类
public class PageBean<T> {
	private int allCount;//总记录数--a
	private int perPageCount;//每页条数--b
	private int pageCount;//页数量
	private int nowPage;//当前页码--c
	private int startNum;//从哪条开始查询
	private int endNum;//从哪条结束
	
	private List<T> pageLists;//由页面传递过来的a,b,c参数得到本集合。

	public int getAllCount() {
		return allCount;
	}

	public void setAllCount(int allCount) {
		this.allCount = allCount;
	}

	public int getPerPageCount() {
		return perPageCount;
	}

	public void setPerPageCount(int perPageCount) {
		this.perPageCount = perPageCount;
	}

	public int getPageCount() {
		return pageCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

	public int getNowPage() {
		return nowPage;
	}

	public void setNowPage(int nowPage) {
		this.nowPage = nowPage;
	}

	public int getStartNum() {
		return startNum;
	}

	public void setStartNum(int startNum) {
		this.startNum = startNum;
	}

	public int getEndNum() {
		return endNum;
	}

	public void setEndNum(int endNum) {
		this.endNum = endNum;
	}

	public List<T> getPageLists() {
		return pageLists;
	}

	public void setPageLists(List<T> pageLists) {
		this.pageLists = pageLists;
	}
}

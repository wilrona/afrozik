import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

class DataTable extends Component{

    constructor(props) {
        super(props);

        this.state = {
            data : [],
            per: this.props.per !== undefined ? this.props.per : 10,
            page: 1,
            query : '',
            loading: true,
            defaultSort: '',
            order: 'ASC',
            header : this.props.header,
            totalPage : 0,
            classTable : this.props.classTable ? ' '+this.props.classTable : '',
            idTable : this.props.idTable ? this.props.idTable : 'table',
            loadingScroll : this.props.loadingScroll !== undefined ? this.props.loadingScroll : true
        };

    }

    UNSAFE_componentWillMount(){
        this.fetchAll();
        if(this.state.loadingScroll){          
            window.addEventListener("scroll", e => {
                this.handleScroll(e);
            });
        }
    };

    componentDidUpdate(oldProps, oldState) {
        const newProps = this.props.search;
        if(oldProps.search !== newProps){
            oldState.query = newProps ? newProps : '';
            oldState.page = 1;
            oldState.order = 'ASC';
            oldState.header = this.props.header
            oldState.loading = true;
            this.fetchAll();
        }
    }

    handleScroll = (e) => {
      const lastLi = document.querySelector("table#"+ this.state.idTable +" tr:last-child");

      if(lastLi){

        const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;

        if (pageOffset > lastLiOffset && this.state.page <= this.state.totalPage){
            this.loadMore();
        }
      }

    };

    loadMore = () => {
        this.setState(
            prevState => (
                {
                    page: prevState.page + 1,
                    scrolling: true
                }
            ),
            () => {
              this.fetchAll()
            }
        )
    };

    sortable = (e, index) => {

        let newsHeader = this.state.header;
        newsHeader.map((head) => head.showDefault ? head.index === index ? head.sortDefault = true : head.sortDefault = false : '');


        if(e.target.classList.contains('sorting_asc')){
            let th = e.currentTarget.parentElement.getElementsByTagName('th');
            for (let i = 0; i < th.length; i++) {
                if(th[i].classList.contains('sorting_desc') || th[i].classList.contains('sorting_asc')){
                    th[i].classList.remove('sorting_desc');
                    th[i].classList.remove('sorting_asc');
                    th[i].classList.add('sorting');
                }

            }
            e.target.classList.remove('sorting');
            e.target.classList.add('sorting_desc');

            this.setState({
                header : newsHeader,
                order: 'DESC'
            }, this.fetchAll())


        }
        else{

            if(e.target.classList.contains('sorting_desc')){

                let th = e.currentTarget.parentElement.getElementsByTagName('th');
                for (let i = 0; i < th.length; i++) {
                    if(th[i].classList.contains('sorting_desc') || th[i].classList.contains('sorting_asc')){
                        th[i].classList.remove('sorting_desc');
                        th[i].classList.remove('sorting_asc');
                        th[i].classList.add('sorting');
                    }
                }

                e.target.classList.remove('sorting');
                e.target.classList.add('sorting_asc');

                this.setState({
                    header : newsHeader,
                    order: 'ASC'
                }, this.fetchAll())
            }

            if(e.target.classList.contains('sorting')){

                let th = e.currentTarget.parentElement.getElementsByTagName('th');
                for (let i = 0; i < th.length; i++) {
                    if(th[i].classList.contains('sorting_desc') || th[i].classList.contains('sorting_asc')){
                        th[i].classList.remove('sorting_desc');
                        th[i].classList.remove('sorting_asc');
                        th[i].classList.add('sorting');
                    }
                }

                e.target.classList.remove('sorting');
                e.target.classList.add('sorting_asc');

                this.setState({
                    header : newsHeader,
                    order: 'ASC'
                }, this.fetchAll())
            }
        }

    };


    fetchAll = () => {

        let load = false;
        let index = null;

        this.state.header.map(head => head.showDefault ? head.sortable && head.sortDefault ? load = true : '' : '');
        this.state.header.map(head => head.showDefault ? head.sortable && head.sortDefault ? head.orderBy ? index = head.orderBy : index = head.index : '' : '');

        if (load){
            this.setState({
                defaultSort : index
            },() => {
                this.queryFetch(this.state)
            });
        }else{
            this.queryFetch(this.state)
        }
    };

    queryFetch = (state) => {
        const { per, page, query, defaultSort, order } = state;

        window.axios.post(this.props.endpoint,
            {
             'per': per,
             'page': page,
             'q' : query,
             'sort' : defaultSort,
             'order' : order
           }).then(({data}) => {

                if(this.state.scrolling){
                  this.setState({
                      data : [...this.state.data, ...data.response.data],
                      scrolling: false,
                      loading: false,
                      totalPage : data.response.page
                  });
                }else{
                  this.setState({
                      data : [...data.response.data],
                      scrolling: false,
                      loading: false,
                      totalPage : data.response.page
                  });
                }

                this.loadJquery();

                // console.log(response.data);
            });
    };

    loadJquery = () => {

      const stateID = this.state.idTable;

      $('#'+ stateID +" [data-checkboxes]").each(function () {
          var me = $(this),
              group = me.data('checkboxes'),
              role = me.data('checkbox-role');

          me.change(function () {

              var all = $('#'+ stateID +' [data-checkboxes="' + group + '"]:not([data-checkbox-role])'),
                  checked = $('#'+ stateID +' [data-checkboxes="' + group + '"]:not([data-checkbox-role="'+ role +'"]):checked'),
                  dad = $('#'+ stateID +' [data-checkboxes="' + group + '"][data-checkbox-role]'),
                  total = all.length,
                  checked_length = checked.length;

              if (role === stateID) {
                  if (me.is(':checked')) {
                      all.prop('checked', true);
                  } else {
                      all.prop('checked', false);
                  }
              } else {
                  if (checked_length >= total) {
                      console.log('all')
                      dad.prop('checked', true);
                  } else {
                      dad.prop('checked', false);
                  }
              }
          });
      });
    }


    emptyTable(){
        return(
            <div className="empty-state" data-height="400" style={{height: "400px"}}>
               <div className="empty-state-icon">
                 <i className="fas fa-database"></i>
               </div>
               <h2>Nous ne trouvons aucune informations</h2>
               <p className="lead">
                 Désolé, nous ne trouvons aucune donnée. Pour vous débarrasser de ce message, entrez au moins une entrée.
               </p>
            </div>
        )
    }



    linkTable = (id) => {

      const linked = this.props.link;

      return(

        <div className="table-links">
              {linked.map((head, index) => {
                const bullet = index > 0 ? <div className="bullet"></div> : '';
                const currentLink = head.link + '' + id;

                if(head.show){
                  return(
                    <span key={index}>
                      {bullet}
                      <Link to={currentLink} className={head.className}>{head.text}</Link>
                    </span>
                  )
                }else{
                  return ''
                }

              })}
         </div>

      )
    }


   contentTable = () => {

     let sortDefault = 0;

     const stateID = this.state.idTable;

     return(
         <table className={"table table-striped"+this.state.classTable} id={this.state.idTable}>
             <tbody>
                 <tr>
                     <th className="text-center pt-2" style={{ width: '10%' }}>
                       <div className="custom-checkbox custom-checkbox-table custom-control">
                         <input type="checkbox" name="all_item" data-checkboxes={stateID} data-checkbox-role={stateID} className="custom-control-input" id={"checkbox-"+stateID+"-all"} />
                         <label htmlFor={"checkbox-"+stateID+"-all"} className="custom-control-label">&nbsp;</label>
                       </div>
                     </th>
                     {this.state.header.map((head, index) =>
                         {
                             if(head.showDefault){
                                 let className;

                                 if(head.sortable && head.sortDefault) sortDefault += 1;

                                 className = head.className ? head.className : '';
                                 className += head.sortDefault && sortDefault === 1 ? ' sorting_asc' : '';
                                 className += head.sortable && !head.sortDefault ? ' sorting' : '';
                                 className += head.sortable && head.sortDefault && sortDefault !== 1? ' sorting' : '';

                                 return (
                                     <th className={className} key={index} onClick={(event) => this.sortable(event, head.index)}>{head.name ? head.name : head.index}</th>
                                 )
                             }else{
                               return '';
                             }

                         }

                     )}
                 </tr>
                 {this.state.data.map((data, index_data) =>
                     {
                         return (
                             <tr key={index_data}>
                                 <td className="text-center pt-2">
                                   <div className="custom-checkbox custom-control">
                                     <input type="checkbox" name='item_id[]' data-checkboxes={stateID} className="custom-control-input" id={"checkbox-"+stateID+"-"+data.id} />
                                     <label htmlFor={"checkbox-"+stateID+"-"+data.id} className="custom-control-label">&nbsp;</label>
                                   </div>
                                 </td>

                                 {this.props.header.map((head, index) =>
                                     {
                                         if(head.showDefault){
                                             let className;
                                             let value;
                                             className = head.className ? head.className : '';
                                             value  = typeof data[head.index]  === 'object' && data[head.index] ? data[head.index][head.subIndex] : data[head.index];

                                             className += (this.props.link && this.props.link.length) > 0 && index === 0 ? ' pt-4 pb-2' : '';

                                             const link = (this.props.link && index === 0) ? this.linkTable(data.id) : '';

                                             return (
                                                 <td key={index} className={className}>
                                                   {value}
                                                   {link}
                                                 </td>
                                             )
                                         }else{
                                           return '';
                                         }
                                     }

                                 )}
                             </tr>
                         )
                     }
                 )}
             </tbody>
         </table>
     )

   }

   contentScrolling = () => {
      return (
          <div className="empty-state" data-height="30" style={{height: "30px"}}>
             <h2 className="mt-0 mb-0"><i className="fas fa-spinner fa-spin"></i> Chargement ....</h2>
           </div>
      )
   }


   contentLoadingMore = () => {

      let contentLoadMore;

      contentLoadMore =   this.state.scrolling ? this.contentScrolling() : '';
      contentLoadMore =   (!this.state.scrolling && this.state.page <= this.state.totalPage) ? (
          <div className="text-center p-3">
              <button className="btn btn-light" onClick={this.loadMore}>Encore plus</button>
          </div>
      ) : '';

      return contentLoadMore    
   }

    render(){

      let tableContent;

      if(this.state.loading){
        tableContent = (
          <div className="empty-state" data-height="300" style={{height: "300px"}}>
             <div className="empty-state-icon">
               <i className="fas fa-spinner fa-spin"></i>
             </div>
             <h2>Chargement ....</h2>
           </div>
        )
      }else{

        if(this.state.data.length){
            tableContent = this.contentTable();
        }else{
            tableContent = this.emptyTable();
        }

      }
      

      return (
          <div className="table-responsive">
              {tableContent}

              {!this.state.loadingScroll && this.state.data.length > 0 && this.contentLoadingMore() }
              {this.state.loadingScroll && this.state.scrolling && this.contentScrolling() }
          </div>
      )

    }


  }



  export default DataTable;

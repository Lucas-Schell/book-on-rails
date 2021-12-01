class MainController < ApplicationController
  def index
    reuslts_per_page = 5
    param_page = params[:page].nil? || params[:page].to_i.zero? ? 1 : Integer(params[:page])
    total_pages = Book.page(1).per(reuslts_per_page).total_pages
    page = Book.page(param_page).per(reuslts_per_page).out_of_range? ? total_pages : param_page
    initial_pagination = if page < 3 || total_pages < 7
                           1
                         elsif total_pages - page < 4
                           total_pages - 5
                         else
                           page - 2
                         end

    @books = Book.order(created_at: :desc).page(page).per(reuslts_per_page)
    @info = { page: page, total_pages: total_pages,
              initial_pagination: initial_pagination }
  end
end

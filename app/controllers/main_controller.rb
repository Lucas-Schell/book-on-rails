class MainController < ApplicationController
  def index
    @books = Book.all.order(updated_at: :desc)
  end
end

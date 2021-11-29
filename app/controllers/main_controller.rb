class MainController < ApplicationController
  def index
    @books = Book.all
  end
end
